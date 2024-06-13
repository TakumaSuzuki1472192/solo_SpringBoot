package com.example.noteApp

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.RowMapper
import org.springframework.stereotype.Component
import org.springframework.stereotype.Repository
import java.sql.ResultSet

@Component
class NoteRowMapper : RowMapper<Note> {
    override fun mapRow(rs: ResultSet, rowNumber: Int): Note {
        return Note(rs.getLong(1), rs.getString(2), rs.getString(3), rs.getTimestamp(4), rs.getTimestamp(5))
    }
}

@Repository
class NoteRepository(
    @Autowired val jdbcTemplate: JdbcTemplate,
    @Autowired val noteRowMapper: NoteRowMapper
) {
    fun getNotes(): List<Note> {
        return jdbcTemplate.query("SELECT * FROM notes ORDER BY COALESCE(updatedAt, createdAt) DESC", noteRowMapper)
    }

    fun getNote(id: Long): List<Note> {
        return jdbcTemplate.query("SELECT * FROM notes WHERE id = ?", arrayOf(id), noteRowMapper)
    }

    fun newNote(): Int {
        return jdbcTemplate.update("INSERT INTO notes(createdAt) VALUES(CURRENT_TIMESTAMP)")
    }

    fun patchNote(patchNote:ReqNote,id: Long): Int {
        return jdbcTemplate.update("UPDATE notes SET title=?, text=?, updatedAt=CURRENT_TIMESTAMP WHERE id = ?",patchNote.title,patchNote.text,id)

    }

    fun summarizeNote(summarizedNote:String?,title:String?,id: Long): List<Note> {
        jdbcTemplate.update("UPDATE notes SET title=?, text=?, updatedAt=CURRENT_TIMESTAMP WHERE id = ?",title,summarizedNote,id)
        return jdbcTemplate.query("SELECT * FROM notes WHERE id = ?", arrayOf(id), noteRowMapper)
    }

    fun deleteNote(id: Long): Int {
        return jdbcTemplate.update("DELETE FROM notes WHERE id = ?", id)
    }
}