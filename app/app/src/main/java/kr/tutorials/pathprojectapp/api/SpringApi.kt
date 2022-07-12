package kr.tutorials.pathprojectapp.api

import kr.tutorials.pathprojectapp.dto.LoginRequest
import kr.tutorials.pathprojectapp.dto.LoginResponse
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST

interface SpringApi {

    @POST("/api/login")
    fun login(
        @Body loginRequest : LoginRequest
    ): Call<LoginResponse>
}