package com.example.noteApp

import com.fasterxml.jackson.annotation.JsonProperty

data class ChatRequest(
    @JsonProperty("model") val model: String,
    @JsonProperty("messages") val messages: List<ReqBody>,
    @JsonProperty("temperature") val temperature: Double
)

data class ReqBody(
    @JsonProperty("role") val role: String?,
    @JsonProperty("content") val content: String?
)

