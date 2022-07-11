package kr.tutorials.pathprojectapp.api

import android.content.Context
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.security.*
import java.security.cert.X509Certificate
import javax.net.ssl.*


class SpringServer {
    companion object {
        private const val url = "https://10.0.2.2:8080"

        fun createServer(context: Context): SpringApi? {
            val client = OkHttpClient.Builder()
            try {
                // Create a trust manager that does not validate certificate chains
                val trustAllCerts: Array<TrustManager> = arrayOf<TrustManager>(
                    object : X509TrustManager {
                        override fun checkClientTrusted(
                            chain: Array<X509Certificate?>?,
                            authType: String?
                        ) {
                        }

                        override fun checkServerTrusted(
                            chain: Array<X509Certificate?>?,
                            authType: String?
                        ) {
                        }

                        override fun getAcceptedIssuers(): Array<X509Certificate?>? {
                            return arrayOf()
                        }
                    }
                )

                // Install the all-trusting trust manager
                val sslContext = SSLContext.getInstance("SSL")
                sslContext.init(null, trustAllCerts, SecureRandom())

                // Create an ssl socket factory with our all-trusting manager
                val sslSocketFactory: SSLSocketFactory = sslContext.socketFactory
                client.sslSocketFactory(sslSocketFactory, trustAllCerts[0] as X509TrustManager)
                client.hostnameVerifier { hostname, session -> true }
            } catch (e: java.lang.Exception) {
                throw RuntimeException(e)
            }

            return Retrofit.Builder()
                .baseUrl(url)
                .client(client.build())
                .addConverterFactory(GsonConverterFactory.create())
                .build()
                .create(SpringApi::class.java)
        }
    }
}