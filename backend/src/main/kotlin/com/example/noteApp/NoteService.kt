package com.example.noteApp

import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.PropertySource
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.http.RequestEntity
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import org.springframework.web.client.RestClientException
import org.springframework.web.client.RestTemplate


@Service
@PropertySource("classpath:api.properties")
class NoteService(val noteRepository: NoteRepository, val restTemplate: RestTemplate) {
    val url: String = "https://api.openai.com/v1/chat/completions"

    @Value("\${spring.datasource.apikey}")
    lateinit var apiKey: String

    private val systemMessage = "次の文章を６行になるように要約、もしくは補完して返してください(箇条書き、改行は\n)："

    fun summarizeNote(summarizeNote: ReqNote, id: Long): String {
        val request = createRequestEntity(summarizeNote)
        return try {
            // API接続
            val response = restTemplate.exchange(request, ChatCompletion::class.java)
            // レスポンスからメッセージを抽出し返却
            extractAPIMessage(response)
        } catch (e: RestClientException) {
            e.printStackTrace()
            "Error connecting to the API"
        }
    }

    private fun createRequestEntity(summarizeNote: ReqNote): RequestEntity<ChatRequest> {
        val headers = HttpHeaders().apply {
            contentType = MediaType.APPLICATION_JSON
            setBearerAuth(apiKey)
        }
        // リクエストボディ生成
        val body = ChatRequest(
            model = "gpt-3.5-turbo",
            messages = listOf(
                ReqBody(role = "system", content = "$systemMessage [${summarizeNote.text}]"),
            ),
            temperature = 0.7
        )
        return RequestEntity.post(url).headers(headers).body(body)
    }

    private fun extractAPIMessage(response: ResponseEntity<ChatCompletion>?): String {
        if (response == null) {
            throw RuntimeException("Error processing the request")
        }
        val responseBody = response.body
        if (responseBody == null || responseBody.choices.isEmpty()) {
            throw RuntimeException("Error processing the response")
        }
        return responseBody.choices[0].message.content
    }

}