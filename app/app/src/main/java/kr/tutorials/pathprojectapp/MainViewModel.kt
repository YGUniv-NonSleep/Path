package kr.tutorials.pathprojectapp

import android.content.Context
import android.util.Log
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.launch
import kr.tutorials.pathprojectapp.api.SpringServer
import kr.tutorials.pathprojectapp.dto.LoginRequest
import kr.tutorials.pathprojectapp.dto.LoginResponse
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class MainViewModel : ViewModel() {
    val error = MutableLiveData<String>()
    val memberInfo = MutableLiveData<LoginResponse>()

    fun login(context: Context, username: String, password: String) = viewModelScope.launch {
        val loginForm = LoginRequest(username, password)
        val request = SpringServer.createServer(context)?.login(loginForm)
        request?.enqueue(object : Callback<LoginResponse> {
            override fun onResponse(call: Call<LoginResponse>, response: Response<LoginResponse>) {
                Log.d("RESPONSE", "Response: ${response.body()}")
                memberInfo.value = response.body()
            }

            override fun onFailure(call: Call<LoginResponse>, t: Throwable) {
                Log.d("RESPONSE", "Response: $t")
            }
        })
    }

}