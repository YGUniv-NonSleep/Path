package kr.tutorials.pathprojectapp.dto

import java.io.Serializable

data class BasketDto(
    var id: Long,
    var menuName: String,
    var quantity: Int,
    var price: Int,
) : Serializable
