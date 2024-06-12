package com.example.noteApp


import org.hamcrest.CoreMatchers.*
import org.hamcrest.MatcherAssert.assertThat
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.*
import org.springframework.boot.test.web.server.LocalServerPort
import org.springframework.http.*
import org.springframework.test.context.jdbc.Sql
import java.sql.Timestamp
import java.util.*

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Sql("/insert_test_data.sql")
class NoteAppApplicationTests(
    @Autowired val restTemplate: TestRestTemplate,
    @LocalServerPort val port: Int
) {
    @Test
    fun contextLoads() {
    }

    @Test
    fun `GETリクエストはOKステータスを返す`() {
        // localhost/todos に GETリクエストを発行する。
        val response = restTemplate.getForEntity("http://localhost:$port/api/notes", String::class.java)
        // レスポンスのステータスコードは OK である。
        assertThat(response.statusCode, equalTo(HttpStatus.OK))
    }

    @Test
    fun `GETリクエストはTodoオブジェクトのリストを返す`() {
        // localhost/todos に GETリクエストを送り、レスポンスを Notesオブジェクトの配列として解釈する。
        val response = restTemplate.getForEntity("http://localhost:$port/api/notes", Array<Note>::class.java)
        // レスポンスの Content-Type は application/json であること。
        assertThat(response.headers.contentType, equalTo(MediaType.APPLICATION_JSON))
        // 配列は3つの要素をもつこと。
        val notes = response.body!!
        assertThat(notes.size, equalTo(3))
        // 最初の要素は id=1 であり、text created_at がシード通りであること。
        assertThat(notes[0].id, equalTo((1)))
        assertThat(notes[0].title, equalTo("ノートタイトル１"))
        assertThat(notes[0].text, equalTo("ノート本文１"))
        assertThat(notes[0].createdAt, notNullValue())
        assertThat(notes[0].createdAt, instanceOf(Timestamp::class.java))
    }

    @Test
    fun `GET idリクエストはidのTodoオブジェクトを返す`() {
        // localhost/todos に GETリクエストを送り、レスポンスを Notesオブジェクトの配列として解釈する。
        val response = restTemplate.getForEntity("http://localhost:$port/api/notes/2", Array<Note>::class.java)
        // レスポンスの Content-Type は application/json であること。
        assertThat(response.headers.contentType, equalTo(MediaType.APPLICATION_JSON))
        // 配列は1つの要素をもつこと。
        val notes = response.body!!
        assertThat(notes.size, equalTo(1))
        // 要素は id=2 であり、text created_at がシード通りであること。
        assertThat(notes[0].id, equalTo((2)))
        assertThat(notes[0].title, equalTo("ノートタイトル２"))
        assertThat(notes[0].text, equalTo("ノート本文２"))
        assertThat(notes[0].createdAt, notNullValue())
        assertThat(notes[0].createdAt, instanceOf(Timestamp::class.java))
    }

    @Test
    fun `POST newリクエストは新しいNOTEをDBに作成してステータス201を返す`() {
        val response = restTemplate.postForEntity("http://localhost:$port/api/notes", "", String::class.java)
        assertThat(response.statusCode, equalTo(HttpStatus.CREATED))
    }

    @Test
    fun `POST newリクエストはNOTEオブジェクトを格納する`() {
        // localhost/todos に GETリクエストを送り、レスポンスを オブジェクトの配列として解釈する。
        var responseGet = restTemplate.getForEntity("http://localhost:$port/api/notes", Array<Note>::class.java)
        // このときのレスポンスを notes1 として記憶。
        val notes1 = responseGet.body
        // localhost/notes に POSTリクエストを送る。このときのボディは""
        restTemplate.postForEntity("http://localhost:$port/api/notes", "", String::class.java)
        // ふたたび localhost/notes に GETリクエストを送り、レスポンスを Todoオブジェクトの配列として解釈する。
        responseGet = restTemplate.getForEntity("http://localhost:$port/api/notes", Array<Note>::class.java)
        // このときのレスポンスを notes2 として記憶。
        val notes2 = responseGet.body
        // 配列 notes2 は、配列 notes1 よりも 1 要素だけ多い。
        assertThat(notes2!!.size, equalTo(notes1!!.size + 1))
        // note2の要素は全てTimestamp型のcreatedAtをもつ。
        notes2.forEach { note: Note ->
            assertThat(note.createdAt, instanceOf(Timestamp::class.java))
        }
    }

//    @Test
//    fun `PATCH idリクエストはidが一致するNOTEをUPDATEする`() {
//        val updateNote = ReqNote(title = "アップデートノート", text = "アップデート本文")
//        val headers = HttpHeaders()
//        headers.set(HttpHeaders.CONTENT_TYPE,"application/json")
//        val requestEntity = HttpEntity(updateNote,headers)
//        val response:ResponseEntity<Int> = restTemplate.exchange(
//            "/api/notes/1",
//            HttpMethod.PATCH,
//            requestEntity,
//            Int::class.java
//        )
//        assertThat(response.statusCode, equalTo(HttpStatus.OK))
//        val responseGET = restTemplate.getForEntity("http://localhost:$port/api/notes/1", Array<Note>::class.java)
//        assertThat(responseGET.body!![0].title, equalTo(updateNote.title))
//        assertThat(responseGET.body!![0].text, equalTo(updateNote.text))
//    }

    @Test
    fun `DELETE idリクエストはidが一致するNOTEを削除する`() {
        var responseGET = restTemplate.getForEntity("http://localhost:$port/api/notes", Array<Note>::class.java)
        val notes1 = responseGET.body
        restTemplate.delete("http://localhost:$port/api/notes/1")
        responseGET = restTemplate.getForEntity("http://localhost:$port/api/notes", Array<Note>::class.java)
        val notes2 = responseGET.body
        assertThat(notes2!!.size, equalTo(notes1!!.size - 1))
        notes2.forEach { note: Note -> assertThat(note.id, not(equalTo(1)))}
    }

}
