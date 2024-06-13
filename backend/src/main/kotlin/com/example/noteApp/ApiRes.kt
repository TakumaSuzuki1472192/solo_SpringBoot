package com.example.noteApp

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.fasterxml.jackson.annotation.JsonProperty

@JsonIgnoreProperties(ignoreUnknown=true)
data class ChatCompletion(
    @JsonProperty("id") val id: String,
    @JsonProperty("object") val objectName: String,
    @JsonProperty("created") val created: Long,
    @JsonProperty("model") val model: String,
    @JsonProperty("choices") val choices: List<Choice>,
    @JsonProperty("usage") val usage: Usage,
    @JsonProperty("system_fingerprint") val systemFingerprint: String?
)

@JsonIgnoreProperties(ignoreUnknown=true)
data class Choice(
    @JsonProperty("index") val index: Int,
    @JsonProperty("message") val message: Message,
    @JsonProperty("logprobs") val logprobs: Any?,
    @JsonProperty("finish_reason") val finishReason: String
)

@JsonIgnoreProperties(ignoreUnknown=true)
data class Message(
    @JsonProperty("role") val role: String,
    @JsonProperty("content") val content: String
)

@JsonIgnoreProperties(ignoreUnknown=true)
data class Usage(
    @JsonProperty("prompt_tokens") val promptTokens: Int,
    @JsonProperty("completion_tokens") val completionTokens: Int,
    @JsonProperty("total_tokens") val totalTokens: Int
)