package com.example.noteApp

import java.sql.Timestamp
import java.util.Date

data class Note(val id:Long,val title:String?,val text:String?, val createdAt:Timestamp,val updatedAt:Timestamp?)
