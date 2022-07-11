package kr.tutorials.pathprojectapp

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import androidx.activity.viewModels
import kr.tutorials.pathprojectapp.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {
    private val binding by lazy {
        ActivityMainBinding.inflate(layoutInflater)
    }
    private val viewModel by viewModels<MainViewModel>()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)

        // Retrofit2에 context 넘겨주기

        viewModel.test.observe(this) {
            Log.d("RESPONSE", "$it")
        }

        viewModel.error.observe(this) {
            Log.d("ERROR", "$it")
        }


        binding.mainBtnAdd.setOnClickListener{
            viewModel.getTodo(applicationContext)
        }
    }
}