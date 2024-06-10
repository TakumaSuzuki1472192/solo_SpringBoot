package com.example.noteApp


import org.hamcrest.CoreMatchers.*
import org.hamcrest.MatcherAssert.assertThat
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.test.web.server.LocalServerPort
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
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
    fun `最初のテスト`() {
        assertThat(1 + 2, equalTo(3))
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

}
