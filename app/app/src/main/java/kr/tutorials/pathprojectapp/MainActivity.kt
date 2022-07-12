package kr.tutorials.pathprojectapp

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import androidx.activity.viewModels
import kr.tutorials.pathprojectapp.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {
    private val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }
    private val viewModel by viewModels<MainViewModel>()
    private var id: Long? = null
    private var loginId: String? = null
    private var name: String? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)

        // 로그인 페이지에서 가져온 회원 정보들
        with(intent) {
            id = getLongExtra("id", 0)
            loginId = getStringExtra("loginId")
            name = getStringExtra("name")
        }
        println("id = ${id}")
        println("loginId = $loginId")
        println("name = $name")
    }
}