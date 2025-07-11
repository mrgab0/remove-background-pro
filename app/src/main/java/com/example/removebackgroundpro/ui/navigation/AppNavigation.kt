package com.example.removebackgroundpro.ui.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import com.example.removebackgroundpro.view.HomeScreen
import com.example.removebackgroundpro.view.ScaleScreen

@Composable
fun AppNavigation(navController: NavHostController) {
    NavHost(navController, startDestination = "home") {
        composable("home") { HomeScreen() }
        composable("scale") { ScaleScreen() }
    }
}
