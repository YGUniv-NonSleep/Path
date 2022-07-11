package kr.tutorials.pathprojectapp

import android.content.Context
import android.util.Log
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.launch
import kr.tutorials.pathprojectapp.api.SpringServer
import kr.tutorials.pathprojectapp.model.Test
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class MainViewModel : ViewModel() {
    val error = MutableLiveData<String>()
    val test = MutableLiveData<Test>()

    fun getTodo(context: Context) = viewModelScope.launch {
        val request = SpringServer.createServer(context)?.getTest()
        request?.enqueue(object : Callback<Test> {
            override fun onResponse(call: Call<Test>, response: Response<Test>) {
                test.value = response.body()
                Log.d("RESPONSE", "Response: ${response.code()}")
            }

            override fun onFailure(call: Call<Test>, t: Throwable) {
                error.value = t.localizedMessage
            }
        })
    }

}