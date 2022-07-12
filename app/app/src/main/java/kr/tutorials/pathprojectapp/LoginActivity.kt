package kr.tutorials.pathprojectapp

import android.content.Intent
import android.content.pm.PackageInfo
import android.content.pm.PackageManager
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Base64
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.activity.viewModels
import kr.tutorials.pathprojectapp.databinding.ActivityLoginBinding
import java.security.MessageDigest
import java.security.NoSuchAlgorithmException

class LoginActivity : AppCompatActivity(), View.OnClickListener {
    private val binding by lazy { ActivityLoginBinding.inflate(layoutInflater) }
    private val viewModel by viewModels<MainViewModel>()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)

        binding.loginBtnLogin.setOnClickListener(this) // 로그인 버튼 클릭시

        viewModel.memberInfo.observe(this) { // 로그인 정보가 들어왔을 때 실행
            moveMainPage() // 메인 페이지 이동
        }

        // 키해시 등록
//        getHashKey()
    }

    override fun onClick(v: View?) {
        when (v?.id) {
            // 로그인 버튼일 때 작동
            binding.loginBtnLogin.id -> {
                val username = binding.loginEtLoginId.text.toString()
                val password = binding.loginEtPassword.text.toString()
                viewModel.login(applicationContext, username, password)
            }
        }
    }

    fun moveMainPage() {
        // 회원정보를 MainActivity에 넘겨준다.
        val intent = Intent(this, MainActivity::class.java).apply {
            putExtra("id", viewModel.memberInfo.value!!.id)
            putExtra("loginId", viewModel.memberInfo.value!!.loginId)
            putExtra("name", viewModel.memberInfo.value!!.name)
            putExtra("role", viewModel.memberInfo.value!!.role)
        }
        startActivity(intent)
    }

    fun getHashKey() {
        var packageInfo: PackageInfo = PackageInfo()
        try {
            packageInfo = packageManager.getPackageInfo(packageName, PackageManager.GET_SIGNATURES)
        } catch (e: PackageManager.NameNotFoundException) {
            e.printStackTrace()
        }
        for (signature in packageInfo.signatures) {
            try {
                var md: MessageDigest = MessageDigest.getInstance("SHA")
                md.update(signature.toByteArray())
                Log.e("KEY_HASH", Base64.encodeToString(md.digest(), Base64.DEFAULT))
            } catch (e: NoSuchAlgorithmException) {
                Log.e("KEY_HASH", "Unable to get MessageDigest. signature = $signature", e)
            }
        }
    }
}