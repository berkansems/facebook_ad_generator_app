from rest_framework import serializers

from facebook_ads.constants import OBJECTIVE_CHOICES, BILLING_EVENT_CHOICES, OPTIMIZATION_GOAL_CHOICES, CURRENCY_CHOICES, STATUS_CHOICES


class CampaignSerializers(serializers.Serializer):
    name = serializers.CharField(max_length=300, required=True)
    objective = serializers.ChoiceField(choices = OBJECTIVE_CHOICES, required=True)

class adSetSerializers(serializers.Serializer):
    name = serializers.CharField(max_length=300, required=True)
    daily_budget = serializers.IntegerField(required=True)
    bid_amount = serializers.IntegerField(required=True)
    publishing_days = serializers.IntegerField(required=True)
    campaign_id = serializers.IntegerField(required=True)
    age_max = serializers.IntegerField(max_value=65, required=True)
    age_min = serializers.IntegerField(min_value=13, required=True)
    billing_event = serializers.ChoiceField(choices=BILLING_EVENT_CHOICES, required=True)
    optimization_goal = serializers.ChoiceField(choices=OPTIMIZATION_GOAL_CHOICES, required=True)
    currency = serializers.ChoiceField(choices=CURRENCY_CHOICES, required=True)

class adSerializers(serializers.Serializer):
    ad_creative_name = serializers.CharField(max_length=300, required=True)
    ad_name = serializers.CharField(max_length=300, required=True)
    ad_link = serializers.URLField(required=True)
    image_url = serializers.URLField(required=True)
    adset_id = serializers.IntegerField(required=True)
    page_id = serializers.IntegerField(required=True)
    post_id = serializers.IntegerField(required=True)
    status_type = serializers.ChoiceField(choices=STATUS_CHOICES, required=True)
