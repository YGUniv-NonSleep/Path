package kr.tutorials.pathprojectapp

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import kr.tutorials.pathprojectapp.dto.CompanyResponse

class MainRvAdapter : RecyclerView.Adapter<MainRvAdapter.Holder>() {

    private var listener: OnItemClickListener? = null
    private var data: ArrayList<CompanyResponse> = ArrayList()

    fun interface OnItemClickListener {
        fun onItemClick(v: View, position: Int)
    }

    fun setListener(listener: OnItemClickListener) {
        this.listener = listener
    }

    fun setData(data: ArrayList<CompanyResponse>) {
        this.data = data
        notifyDataSetChanged()
    }

    fun getItem(position: Int): CompanyResponse {
        return data[position]
    }

    // Data 개수 알려준다. 만약 0을 반환하면 RecyclerView에는 아무것도 그려지지 않는다.
    override fun getItemCount(): Int {
        return data.size
    }

    // Data보단 적지만 RecyclerView를 가득 채우고 스크롤 할 수 있을 만큼 ViewHolder를 생성하고, 어떤 xml 파일을 inflate 할 지 지정
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): Holder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.main_rv_item, parent, false)
        return Holder(view, listener)
    }

    // ViewHolder에 Data 내용 넣는 작업
    override fun onBindViewHolder(holder: Holder, position: Int) {
        val item = data[position]
        holder.id = item.id
        holder.title.text = item.name
        holder.category.text = item.category
        holder.latitude = item.latitude
        holder.longitude = item.longitude
    }

    // RecyclerView.ViewHolder를 상속받는 클래스로 커스텀 ViewHolder이다.
    class Holder(view: View, listener: OnItemClickListener?) : RecyclerView.ViewHolder(view) {
        var id: Long = 0L
        val title: TextView = view.findViewById(R.id.main_item_tvTitle)
        val category: TextView = view.findViewById(R.id.main_item_tvCategory)
        var latitude: Double = 0.0
        var longitude: Double = 0.0

        init {
            view.setOnClickListener {
                listener?.onItemClick(view, this.layoutPosition)
            }
        }
    }
}