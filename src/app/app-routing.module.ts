import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WelcomeComponent } from "./containers/welcome/welcome.component";
import { QuizComponent } from "./containers/quiz/quiz.component";
import { CanActivateHomeGuard } from "./guards/can-activate-home.guard";
import { ResultsComponent } from "./containers/results/results.component";
import { AdministratorComponent } from "./containers/administrator/administrator.component";
import { CanActivateAdminGuard } from "./guards/can-activate-admin.guard";

const routes: Routes = [
  {
    path: ":area/welcome",
    component: WelcomeComponent,
    data: { title: "Welcome" }    
  },
  {
    path: "quiz",
    component: QuizComponent,
    data: { title: "Quiz" },
    canActivate: [
      CanActivateHomeGuard
    ]
  },
  {
    path: "results",
    component: ResultsComponent,
    data: { title: "Result" },
    canActivate: [
      CanActivateHomeGuard
    ]
  },
  {
    path: "admin",
    component: AdministratorComponent,
    data: { title: "Administrator" },
    canActivate: [
      CanActivateAdminGuard
    ]    
  },
  {
    path: "settings",
    component: AdministratorComponent,
    data: { title: "Administrator" },
    canActivate: [
      CanActivateAdminGuard
    ]    
  },
  {
    path: "",
    redirectTo: "/general-knowledge/welcome",
    pathMatch: "full"
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
