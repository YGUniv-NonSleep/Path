package kr.tutorials.pathprojectapp.adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import kr.tutorials.pathprojectapp.R
import kr.tutorials.pathprojectapp.dto.BasketDto

class BasketRvAdapter : RecyclerView.Adapter<BasketRvAdapter.Holder>() {

    private var listener: OnItemClickListener? = null
    private var data: ArrayList<BasketDto> = ArrayList()

    fun interface OnItemClickListener {
        fun onItemClick(v: View, position: Int)
    }

    fun setListener(listener: OnItemClickListener) {
        this.listener = listener
    }

    fun setData(data: ArrayList<BasketDto>) {
        this.data = data
        notifyDataSetChanged()
    }

    fun getItem(position: Int): BasketDto {
        return data[position]
    }

    fun findItem(id: Long): BasketDto? {
        data.map { b ->
            if (b.id == id) {
                return b
            }
        }
        return null
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): Holder {
        val view =
            LayoutInflater.from(parent.context).inflate(R.layout.basket_rv_item, parent, false)
        return Holder(view, listener)
    }

    override fun onBindViewHolder(holder: Holder, position: Int) {
        val item = data[position]
        holder.menuName.text = item.menuName
        holder.price.text = (item.price * item.quantity).toString()
        holder.quantity.text = item.quantity.toString()
    }

    override fun getItemCount(): Int {
        return data.size
    }

    fun deleteItem(position: Int) {
        data.remove(data[position])
    }

    class Holder(view: View, listener: OnItemClickListener?) : RecyclerView.ViewHolder(view) {
        var menuName: TextView = view.findViewById(R.id.basket_item_tvMenuName)
        var price: TextView = view.findViewById(R.id.basket_item_tvPrice)
        var quantity: TextView = view.findViewById(R.id.basket_item_tvQuantity)
        var btnDelete: Button = view.findViewById(R.id.basket_item_btnDelete)

        init {
            btnDelete.setOnClickListener {
                listener?.onItemClick(view, this.layoutPosition)
            }
        }
    }

}