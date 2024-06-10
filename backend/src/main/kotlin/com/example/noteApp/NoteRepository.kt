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
    fun getNotes():List<Note> {
        return jdbcTemplate.query("SELECT * FROM notes",noteRowMapper)
    }
}