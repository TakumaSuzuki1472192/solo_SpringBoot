package com.example.noteApp

import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class NoteController(val noteRepository: NoteRepository) {
    @GetMapping("/api/notes")
    fun getNotes(): List<Note> {
        return noteRepository.getNotes()
    }

    @GetMapping("/api/notes/{id}")
    fun getNote(@PathVariable("id") id:Long): List<Note> {
        return noteRepository.getNote(id)
    }

    @PostMapping("/api/notes")
    fun newNote():Int {
        return noteRepository.newNote()
    }

    @PatchMapping("/api/notes/{id}")
    fun patchNote(@RequestBody patchNote : ReqNote , @PathVariable("id") id:Long):Int {
        return noteRepository.patchNote(patchNote,id)
    }

    @DeleteMapping("/api/notes/{id}")
    fun deleteNote(@PathVariable("id") id:Long):Int {
        return  noteRepository.deleteNote(id)
    }
}