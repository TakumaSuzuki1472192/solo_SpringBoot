package com.example.noteApp

import java.sql.Timestamp

data class Note(val id:Long,val title:String?,val text:String?, val createdAt:Timestamp,val updatedAt:Timestamp?)
