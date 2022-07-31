package kr.tutorials.pathprojectapp

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.recyclerview.widget.LinearLayoutManager
import kr.tutorials.pathprojectapp.adapter.BasketRvAdapter
import kr.tutorials.pathprojectapp.databinding.ActivityOrderBinding
import kr.tutorials.pathprojectapp.dto.BasketDto

class OrderActivity : AppCompatActivity(), View.OnClickListener {
    private var baskets = arrayListOf<BasketDto>()
    private var amount: Int = 0

    private var basketAdapter = BasketRvAdapter()
    private val binding by lazy { ActivityOrderBinding.inflate(layoutInflater) }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)

        // 업체 주문 페이지에서 가져온 장바구니 정보
        with(intent) {
            baskets = getSerializableExtra("baskets") as ArrayList<BasketDto>
        }

        // 장바구니 리사이클러뷰 초기화
        initRecyclerView()
        // 장바구니 데이터 넣기
        basketAdapter.setData(baskets)
        // 총주문가격 갱신
        baskets.forEach { b -> amount += b.price * b.quantity }
        binding.orderTvAmount.text = "$amount 원"

        binding.orderBtnBackPage.setOnClickListener(this)
        binding.orderBtnOrder.setOnClickListener(this)
    }

    private fun initRecyclerView() {
        var manager = LinearLayoutManager(this)
        binding.orderRecyclerView.layoutManager = manager
        binding.orderRecyclerView.setHasFixedSize(true)
        binding.orderRecyclerView.adapter = basketAdapter
        basketAdapter.setListener { _, position ->
            val data = basketAdapter.getItem(position)
            // 장바구니에서 수량 낮추기 or 제거
            data.quantity--;
            if (data.quantity == 0) {
                amount -= data.price
                val filter: ArrayList<BasketDto> =
                    baskets.filter { it.id != data.id } as ArrayList<BasketDto>
                baskets = filter
                basketAdapter.setData(baskets)
            } else {
                amount -= data.price
                basketAdapter.setData(baskets)
            }
            binding.orderTvAmount.text = "$amount 원"
        }
    }

    override fun onClick(v: View?) {
        when (v?.id) {
            binding.orderBtnBackPage.id -> finish()
            binding.orderBtnOrder.id -> {
                Toast.makeText(this, "결제가 완료되었습니다.", Toast.LENGTH_LONG).show()
                val intent = Intent(this, MainActivity::class.java)
                startActivity(intent)
            }
        }
    }
}