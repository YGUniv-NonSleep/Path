package kr.tutorials.pathprojectapp.api

import kr.tutorials.pathprojectapp.model.Test
import retrofit2.Call
import retrofit2.http.GET

interface SpringApi {
    
    @GET("/api/test")
    fun getTest(): Call<Test>
}