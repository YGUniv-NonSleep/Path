package kr.tutorials.pathprojectapp

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Toast
import kr.tutorials.pathprojectapp.databinding.ActivityLoginBinding

class LoginActivity : AppCompatActivity(), View.OnClickListener {
    private val binding by lazy {
        ActivityLoginBinding.inflate(layoutInflater)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)

        binding.loginBtnLogin.setOnClickListener(this) // 로그인 버튼 클릭시
    }

    override fun onClick(v: View?) {
        when(v?.id) {
            binding.loginBtnLogin.id -> {
                Toast.makeText(this,"로그인클릭",Toast.LENGTH_SHORT).show()
                val intent = Intent(this, MainActivity::class.java)
                startActivity(intent)
            }
        }
    }
}