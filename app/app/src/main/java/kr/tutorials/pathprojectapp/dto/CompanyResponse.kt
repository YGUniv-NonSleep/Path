package kr.tutorials.pathprojectapp.dto

data class CompanyResponse(
    var id: Long,
    var latitude: Double,
    var longitude: Double,
    var name: String,
    var category: String
)