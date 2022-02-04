from django.urls import path
from facebook_ads import views

urlpatterns = {
    path("facebook_campaigns/",views.facebook_campaigns),
    path("create_adset/",views.create_adset),
    path("list_constrains/",views.list_constrains),
    path("get_campaign_adsets/<int:pk>",views.get_campaign_adsets),
    path("get_adset_ads/<int:pk>",views.get_adset_ads),
    path("get_insights/<int:pk>",views.get_insights),
    path("create_ad/",views.create_ad),
    path("ad_preview/<int:pk>",views.ad_preview),
}
