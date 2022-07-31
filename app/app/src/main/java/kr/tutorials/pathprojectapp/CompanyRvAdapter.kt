package kr.tutorials.pathprojectapp

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import kr.tutorials.pathprojectapp.dto.ProductDto

class CompanyRvAdapter : RecyclerView.Adapter<CompanyRvAdapter.Holder>() {

    private var listener: OnItemClickListener? = null
    private var data: ArrayList<ProductDto> = ArrayList()

    fun interface OnItemClickListener {
        fun onItemClick(v: View, position: Int)
    }

    fun setListener(listener: OnItemClickListener) {
        this.listener = listener
    }

    fun setData(data: ArrayList<ProductDto>) {
        this.data = data
        notifyDataSetChanged()
    }

    fun getItem(position: Int): ProductDto {
        return data[position]
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): CompanyRvAdapter.Holder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.company_rv_item, parent, false)
        return Holder(view, listener)
    }

    override fun onBindViewHolder(holder: CompanyRvAdapter.Holder, position: Int) {
        val item = data[position]
        holder.id = item.id
        holder.menuName.text = item.menuName
        holder.price.text = item.price.toString()
    }

    override fun getItemCount(): Int {
        return data.size
    }

    class Holder(view: View, listener: OnItemClickListener?) : RecyclerView.ViewHolder(view) {
        var id: Long = 0L
        var menuName: TextView = view.findViewById(R.id.company_item_tvMenuName)
        var price: TextView = view.findViewById(R.id.company_item_tvPrice)
        var btnAdd: Button = view.findViewById(R.id.company_item_add)

        init {
            btnAdd.setOnClickListener {
                listener?.onItemClick(view, this.layoutPosition)
            }
        }
    }

}