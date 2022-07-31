package kr.tutorials.pathprojectapp

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.recyclerview.widget.LinearLayoutManager
import kr.tutorials.pathprojectapp.adapter.BasketRvAdapter
import kr.tutorials.pathprojectapp.adapter.CompanyRvAdapter
import kr.tutorials.pathprojectapp.databinding.ActivityCompanyBinding
import kr.tutorials.pathprojectapp.dto.BasketDto
import kr.tutorials.pathprojectapp.dto.ProductDto

class CompanyActivity : AppCompatActivity(), View.OnClickListener {
    private var companyId: Long? = null
    private var baskets = arrayListOf<BasketDto>()
    private var companyMenus = arrayListOf<ProductDto>()

    private var basketAdapter = BasketRvAdapter()
    private var companyAdapter = CompanyRvAdapter()
    private val binding by lazy { ActivityCompanyBinding.inflate(layoutInflater) }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)

        // 메인 페이지에서 가져온 업체번호
        with(intent) {
            companyId = getLongExtra("id", 0)
        }

        binding.companyTvTitle.text = "투썸플레이스"
        binding.companyTvCategory.text = "카페"
        binding.companyBtnBackPage.setOnClickListener(this)
        binding.companyBtnOrder.setOnClickListener(this)

        // 기본 데이터 초기화
        initData()

        // 리사이클러뷰 초기화
        initRecyclerView()
        // 메뉴 데이터 넣기
        companyAdapter.setData(companyMenus)
    }

    override fun onClick(v: View?) {
        when (v?.id) {
            binding.companyBtnBackPage.id -> finish()
            binding.companyBtnOrder.id -> {
                val intent = Intent(this, OrderActivity::class.java).apply {
                    putExtra("baskets", baskets)
                }
                startActivity(intent)
            }
        }
    }

    private fun initRecyclerView() {
        var manager = LinearLayoutManager(this)
        // 메뉴 리사이클러뷰 초기화
        binding.companyRecyclerView.layoutManager = manager
        binding.companyRecyclerView.setHasFixedSize(true)
        binding.companyRecyclerView.adapter = companyAdapter
        companyAdapter.setListener { _, position ->
            val data = companyAdapter.getItem(position)
            // 장바구니 추가
            val basketItem = basketAdapter.findItem(data.id)
            if (basketItem == null) {
                baskets.add(BasketDto(data.id, data.menuName, 1, data.price))
            } else {
                basketItem.quantity++
            }
            basketAdapter.setData(baskets)
        }

        var manager2 = LinearLayoutManager(this)
        // 장바구니 리사이클러뷰 초기화
        binding.companyBasketRecyclerView.layoutManager = manager2
        binding.companyBasketRecyclerView.setHasFixedSize(true)
        binding.companyBasketRecyclerView.adapter = basketAdapter
        basketAdapter.setListener { _, position ->
            val data = basketAdapter.getItem(position)
            // 장바구니에서 수량 낮추기 or 제거
            data.quantity--;
            if (data.quantity == 0) {
                val filter: ArrayList<BasketDto> =
                    baskets.filter { it.id != data.id } as ArrayList<BasketDto>
                baskets = filter
                basketAdapter.setData(baskets)
            } else basketAdapter.setData(baskets)
        }
    }

    private fun initData() {
        // 업체 메뉴 데이터 초기화
        companyMenus.addAll(
            arrayListOf<ProductDto>(
                ProductDto(1, "아메리카노", 2000),
                ProductDto(2, "카페라떼", 3000),
                ProductDto(3, "초코라떼", 3500),
                ProductDto(4, "쿠키", 2500),
            )
        )
    }
}