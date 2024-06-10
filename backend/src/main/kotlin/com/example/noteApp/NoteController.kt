package com.example.noteApp

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class NoteController(val noteRepository: NoteRepository) {
    @GetMapping("/api/notes")
    fun getNotes(): List<Note> {
        return noteRepository.getNotes()
    }
}