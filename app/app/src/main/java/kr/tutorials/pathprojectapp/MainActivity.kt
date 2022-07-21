package kr.tutorials.pathprojectapp

import android.graphics.Color
import android.os.Bundle
import android.view.ViewGroup
import android.widget.Toast
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import kr.tutorials.pathprojectapp.databinding.ActivityMainBinding
import kr.tutorials.pathprojectapp.dto.CompanyResponse
import net.daum.mf.map.api.*


class MainActivity : AppCompatActivity() {
    private var userId: Long? = null
    private var loginId: String? = null
    private var userName: String? = null
    private var mapView: MapView? = null
    private var adapter = MainRvAdapter()
    private val viewModel by viewModels<MainViewModel>()
    private val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)

        // 로그인 페이지에서 가져온 회원 정보들
        with(intent) {
            userId = getLongExtra("id", 0)
            loginId = getStringExtra("loginId")
            userName = getStringExtra("name")
        }
        println("id = ${userId}")
        println("loginId = $loginId")
        println("name = $userName")

        // 카카오 지도 띄우기
        mapView = MapView(this)
        val mapViewContainer: ViewGroup = binding.mainMapView
        mapViewContainer.addView(mapView)
        // 지도 중심점 변경
        mapView?.setMapCenterPoint(MapPoint.mapPointWithGeoCoord(35.8953251, 128.62155), true)
        // 경로 그리기
        getPathList()

        // 리사이클러뷰 초기화
        initRecyclerView()
        // 가게 데이터 넣기
        adapter.setData(companys)
    }

    private fun initRecyclerView() {
        val manager = LinearLayoutManager(this)
        binding.mainRecyclerView.layoutManager = manager
        binding.mainRecyclerView.setHasFixedSize(true)
        binding.mainRecyclerView.adapter = adapter
        adapter.setListener { _, position ->
            val data = adapter.getItem(position)
            changeViewCompanyDetail(data.id)
        }
    }

    // 가게 상세 페이지 이동
    private fun changeViewCompanyDetail(id: Long) {
        Toast.makeText(this, "가게 상세페이지 이동 $id", Toast.LENGTH_SHORT).show()
    }

    // 경로 그리기
    fun getPathList() {
        var polyline: MapPolyline = MapPolyline();
        polyline.tag = 1000
        polyline.lineColor = Color.argb(128, 255, 51, 0)
        polyline.addPoint(MapPoint.mapPointWithGeoCoord(35.89343576601386, 128.61997709431037));
        polyline.addPoint(MapPoint.mapPointWithGeoCoord(35.893181744948585, 128.62029633823536));
        polyline.addPoint(MapPoint.mapPointWithGeoCoord(35.893027322868036, 128.6205277445079));
        polyline.addPoint(MapPoint.mapPointWithGeoCoord(35.89289104072486, 128.62073713817318));
        polyline.addPoint(MapPoint.mapPointWithGeoCoord(35.8927088905354, 128.62110124722656));
        polyline.addPoint(MapPoint.mapPointWithGeoCoord(35.892416976736065, 128.62177464387744));
        polyline.addPoint(MapPoint.mapPointWithGeoCoord(35.892262034372806, 128.62210573152905));
        polyline.addPoint(MapPoint.mapPointWithGeoCoord(35.89166005100483, 128.62347451553208));
        polyline.addPoint(MapPoint.mapPointWithGeoCoord(35.89166005100483, 128.62347451553208));
        polyline.addPoint(MapPoint.mapPointWithGeoCoord(35.89141393792583, 128.62400425890814));
        polyline.addPoint(MapPoint.mapPointWithGeoCoord(35.8913595150038, 128.62407029052278));
        polyline.addPoint(MapPoint.mapPointWithGeoCoord(35.89126020105434, 128.6241027391819));
        polyline.addPoint(MapPoint.mapPointWithGeoCoord(35.889555048969044, 128.62442161856455));
        polyline.addPoint(MapPoint.mapPointWithGeoCoord(35.887949036636115, 128.624741265292));
        polyline.addPoint(MapPoint.mapPointWithGeoCoord(35.88772348534076, 128.62478379403717));
        polyline.addPoint(MapPoint.mapPointWithGeoCoord(35.88756102372109, 128.62482681928097));
        polyline.addPoint(MapPoint.mapPointWithGeoCoord(35.88756102372109, 128.62482681928097));
        polyline.addPoint(MapPoint.mapPointWithGeoCoord(35.88743461333903, 128.62487012821825));
        polyline.addPoint(MapPoint.mapPointWithGeoCoord(35.88729913237275, 128.62492444162996));
        polyline.addPoint(MapPoint.mapPointWithGeoCoord(35.88719970263701, 128.62497903877122));
        polyline.addPoint(MapPoint.mapPointWithGeoCoord(35.88710922792617, 128.62504478231466));
        polyline.addPoint(MapPoint.mapPointWithGeoCoord(35.88632222362227, 128.6255923789008));
        polyline.addPoint(MapPoint.mapPointWithGeoCoord(35.88588770012878, 128.6259544563747));
        polyline.addPoint(MapPoint.mapPointWithGeoCoord(35.88511784876171, 128.62666830705484));
        polyline.addPoint(MapPoint.mapPointWithGeoCoord(35.88504568833494, 128.62667881300743));
        polyline.addPoint(MapPoint.mapPointWithGeoCoord(35.88498288818275, 128.62662293858446));
        polyline.addPoint(MapPoint.mapPointWithGeoCoord(35.88465219237042, 128.62608869574547));
        polyline.addPoint(MapPoint.mapPointWithGeoCoord(35.88465219237042, 128.62608869574547));
        polyline.addPoint(MapPoint.mapPointWithGeoCoord(35.884267764042185, 128.6254875801797));
        polyline.addPoint(MapPoint.mapPointWithGeoCoord(35.88424130355318, 128.62537661556374));
        polyline.addPoint(MapPoint.mapPointWithGeoCoord(35.88395508868356, 128.62495348876533));
        polyline.addPoint(MapPoint.mapPointWithGeoCoord(35.883696026162845, 128.62450842760003));
        polyline.addPoint(MapPoint.mapPointWithGeoCoord(35.883526051952906, 128.62426342898323));
        polyline.addPoint(MapPoint.mapPointWithGeoCoord(35.883355788891, 128.62407380657612));
        polyline.addPoint(MapPoint.mapPointWithGeoCoord(35.88316698096164, 128.6239837183573));
        polyline.addPoint(MapPoint.mapPointWithGeoCoord(35.88296892951281, 128.6239378596454));
        polyline.addPoint(MapPoint.mapPointWithGeoCoord(35.882779487268444, 128.62396959668314));
        polyline.addPoint(MapPoint.mapPointWithGeoCoord(35.881493086821415, 128.62522206012468));
        polyline.addPoint(MapPoint.mapPointWithGeoCoord(35.881356912197965, 128.62540926605453));
        polyline.addPoint(MapPoint.mapPointWithGeoCoord(35.88130208390592, 128.6255528116594));
        polyline.addPoint(MapPoint.mapPointWithGeoCoord(35.88124719762671, 128.62570743180027));
        polyline.addPoint(MapPoint.mapPointWithGeoCoord(35.881092996611905, 128.62589449418414));
        polyline.addPoint(MapPoint.mapPointWithGeoCoord(35.88073976107685, 128.6262239625842));
        polyline.addPoint(MapPoint.mapPointWithGeoCoord(35.880558636562775, 128.62638866013066));
        polyline.addPoint(MapPoint.mapPointWithGeoCoord(35.880386756216204, 128.6265091296111));
        polyline.addPoint(MapPoint.mapPointWithGeoCoord(35.88016085671881, 128.6266180971123));
        polyline.addPoint(MapPoint.mapPointWithGeoCoord(35.87989006673452, 128.62669348458368));
        polyline.addPoint(MapPoint.mapPointWithGeoCoord(35.87970033418326, 128.62678058652307));
        polyline.addPoint(MapPoint.mapPointWithGeoCoord(35.87945640878595, 128.62688940999078));
        polyline.addPoint(MapPoint.mapPointWithGeoCoord(35.87914095999086, 128.62688691891438));
        polyline.addPoint(MapPoint.mapPointWithGeoCoord(35.87877160800149, 128.62685077767904));
        mapView?.addPolyline(polyline)
        var mapPointBounds = MapPointBounds(polyline.mapPoints);
        val padding = 100;
        mapView?.moveCamera(CameraUpdateFactory.newMapPointBounds(mapPointBounds, padding))
    }

    private var companys = arrayListOf<CompanyResponse>(
        CompanyResponse(1, 1.1, 1.1, "가게이름1", "카테고리"),
        CompanyResponse(2, 1.1, 1.1, "가게이름2", "카테고리"),
        CompanyResponse(3, 1.1, 1.1, "가게이름3", "카테고리"),
        CompanyResponse(4, 1.1, 1.1, "가게이름4", "카테고리"),
        CompanyResponse(5, 1.1, 1.1, "가게이름5", "카테고리"),
        CompanyResponse(6, 1.1, 1.1, "가게이름6", "카테고리"),
        CompanyResponse(7, 1.1, 1.1, "가게이름7", "카테고리"),
        CompanyResponse(8, 1.1, 1.1, "가게이름8", "카테고리"),
        CompanyResponse(9, 1.1, 1.1, "가게이름9", "카테고리"),
        CompanyResponse(10, 1.1, 1.1, "가게이름10", "카테고리"),
    )
}