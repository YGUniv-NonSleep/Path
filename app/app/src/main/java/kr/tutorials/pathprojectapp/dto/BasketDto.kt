package kr.tutorials.pathprojectapp.dto

data class BasketDto(
    var id: Long,
    var menuName: String,
    var quantity: Int,
    var price: Int,
)
