package kr.tutorials.pathprojectapp.dto

data class LoginResponse(
    val id: Long,
    val loginId: String,
    val name: String,
    val role: String
)