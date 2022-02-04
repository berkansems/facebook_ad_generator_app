"""
facebook_ads app presents methods to handle facebook ads
"""
import json
from datetime import datetime, timedelta

from django.conf import settings
from django.core.serializers.json import DjangoJSONEncoder
from django.http import HttpResponse
from facebook_business.adobjects.ad import Ad
from facebook_business.adobjects.adaccount import AdAccount
from facebook_business.adobjects.adcreative import AdCreative
from facebook_business.adobjects.adset import AdSet
from facebook_business.adobjects.adsinsights import AdsInsights
from facebook_business.adobjects.campaign import Campaign
from facebook_business.api import FacebookAdsApi
from rest_framework import status
from rest_framework.decorators import api_view

from facebook_ads.constants import OBJECTIVE_CHOICES, BILLING_EVENT_CHOICES, OPTIMIZATION_GOAL_CHOICES, \
    CURRENCY_CHOICES, STATUS_CHOICES
from facebook_ads.serializers import CampaignSerializers, adSetSerializers, adSerializers


def permit_response(response):
    """adjusting response"""
    response['Access-Control-Allow-Origin'] = '*'
    response['Access-Control-Allow-Credentials'] = 'true'
    response['Access-Control-Allow-Headers'] = 'Content-Type'
    response['Cache-Control'] = 'no-store, no-cache'
    return response


def json_responser(status, message="", data=None):
    """sending json data format"""
    json_data = {'response_message': message,
                 'response_code': status,
                 'response_data': data
                 }

    json_data = json.dumps(json_data, cls=DjangoJSONEncoder)
    response = HttpResponse(json_data)
    return permit_response(response)

def exception_handler(err):
    """this method handle different errors may happen during request"""
    if hasattr(err, '_error'):
        response_message = err._error['error_user_msg']
    elif hasattr(err, 'args'):
        error_args = ''
        for item in err.args:
            error_args += str(item) + ' '
        response_message = "Some Errors In: " + error_args
    else:
        response_message = "Error in getting data"
    response_status = status.HTTP_400_BAD_REQUEST
    return response_message , response_status

@api_view(['GET', 'POST'])
def facebook_campaigns(request):
    '''
    This method help us to create new Campaign by giving correct dataset which
    is controlling by serializers or helps to retrieve all campaigns
    '''

    FacebookAdsApi.init(access_token=settings.MY_APP_TOKEN)

    if request.method == "POST":
        ser = CampaignSerializers(data=request.data)
        response_data = []
        if ser.is_valid():

            fields = [
            ]
            params = {
                'name': request.data['name'],
                'objective': request.data['objective'],
                'special_ad_categories': [],
            }
            try:
                compaign_result = AdAccount(settings.ID).create_campaign(fields=fields, params=params)
                response_status = status.HTTP_201_CREATED
                response_message = f"Campaign is Successfully Created, Campaign Id is {compaign_result['id']}"
            except Exception as err:
                response_message , response_status = exception_handler(err)

        else:
            response_status = status.HTTP_400_BAD_REQUEST
            response_message = 'There are some errors in serializing data'
            response_data = json.dumps(ser.errors)
        return json_responser(response_status, response_message, response_data)

    elif request.method == "GET":
        response_data = []
        fields = [
            'name',
            'objective',
        ]
        params = {
            'effective_status': ['ACTIVE', 'PAUSED'],
        }
        try:
            get_campaigns = AdAccount(settings.ID).get_campaigns(
                fields=fields,
                params=params,
            )
            campaign_list = list(get_campaigns)
            for item in campaign_list:
                new_dict ={}
                new_dict['id'] = item['id']
                new_dict['name'] = item['name']
                new_dict['objective'] = item['objective']
                response_data.append(new_dict)

            response_message = f"{len(campaign_list)} Result/s Found" if  len(campaign_list) > 0\
                            else "No Result Found"
            response_status = status.HTTP_200_OK
        except Exception as err:
            response_message , response_status = exception_handler(err)

        return json_responser(response_status, response_message, response_data)



@api_view(['POST'])
def create_adset(request):
    '''
    This method help us to create new Adset by giving correct dataset
    which is controlling by serializers
    '''

    FacebookAdsApi.init(access_token=settings.MY_APP_TOKEN)
    response_data = []

    ser = adSetSerializers(data=request.data)
    if ser.is_valid():
        name = request.data['name']
        campaign_id = request.data['campaign_id']
        daily_budget = int(request.data['daily_budget'])
        publishing_days = int(request.data['publishing_days'])
        lifetime_budget = daily_budget * publishing_days
        bid_amount = request.data['bid_amount']
        currency = request.data['currency']
        billing_event = request.data['billing_event']
        optimization_goal = request.data['optimization_goal']
        age_max = request.data['age_max']
        age_min = request.data['age_min']
        current_datetime = datetime.now()
        start_datetime = current_datetime.strftime('%Y-%m-%dT%H:%M:%S%z')
        end_datetime = (current_datetime +
                        timedelta(days=publishing_days)).strftime('%Y-%m-%dT%H:%M:%S%z')

        fields = [
        ]
        params = {
            'name': name,
            'lifetime_budget': lifetime_budget,
            'start_time': start_datetime,
            'end_time': end_datetime,
            'campaign_id': campaign_id,
            'bid_amount': bid_amount,
            'currency': currency,
            'billing_event': billing_event,
            'optimization_goal': optimization_goal,
            'targeting': {'age_min': f'{age_min}', 'age_max':  f'{age_max}',
                          'geo_locations': {'country_groups': ['gcc']},
                          "excluded_geo_locations": {'custom_locations': [
                              {'latitude': 25.26, 'longitude': 51.55, 'radius': 80,
                               'distance_unit': 'kilometer'},
                              {'latitude': 26.13, 'longitude': 50.55, 'radius': 30,
                               'distance_unit': 'kilometer'},
                              {'latitude': 23.68, 'longitude': 57.90, 'radius': 80,
                               'distance_unit': 'kilometer'}]}},
            'status': 'ACTIVE',
        }
        try:
            adset_result = AdAccount(settings.ID).create_ad_set(
                fields=fields,
                params=params,
            )
            response_message = f"Adset Successfully Created, Adset Id is {adset_result['id']}"
            response_status = status.HTTP_201_CREATED
        except Exception as err:
            response_message , response_status = exception_handler(err)

    else:
        response_status = status.HTTP_400_BAD_REQUEST
        response_message = 'Please check your inputs, Not passed serializer!'
        response_data = json.dumps(ser.errors)

    return json_responser(response_status, response_message, response_data)



@api_view(['GET'])
def get_campaign_adsets(request,pk):
    '''
    This method returns ads of specific Campaign using its id presented as pk
    '''
    FacebookAdsApi.init(access_token=settings.MY_APP_TOKEN)
    response_data = []

    fields = [
        'name',
        'start_time',
        'end_time',
        'bid_amount',
        'lifetime_budget',
    ]
    params = {
    }
    try:
        campaign_adsets = Campaign(pk).get_ad_sets(
            fields=fields,
            params=params,
        )


        adset_list = list(campaign_adsets)
        response_status = status.HTTP_200_OK
        response_message = f"{len(adset_list)} Result/s Found For Campaign Id : {pk}" if len(adset_list) > 0 \
            else f"No AdSet Found For Campaign Id : {pk}"

        for item in adset_list:
            new_dict = {}
            new_dict['id'] = item['id']
            new_dict['name'] = item['name']
            new_dict['start_time'] = item['start_time']
            new_dict['end_time'] = item['end_time']
            try:
                bid = item['bid_amount']
            except:
                bid = 'Undefined'
            new_dict['bid_amount'] = bid
            new_dict['lifetime_budget'] = item['lifetime_budget']
            response_data.append(new_dict)
    except Exception as err:
        response_message , response_status = exception_handler(err)
    return json_responser(response_status, response_message, response_data)


@api_view(['GET'])
def get_adset_ads(request,pk):
    '''
    This method returns ads of specific Adset using its id presented as pk
    '''
    response_data =[]
    FacebookAdsApi.init(access_token=settings.MY_APP_TOKEN)

    try:
        fields = [
            Ad.Field.name,
            Ad.Field.configured_status,
            Ad.Field.effective_status,
            Ad.Field.creative,
        ]
        params = {
            Ad.Field.effective_status: [
                'ACTIVE',
                'PAUSED',
                'PENDING_REVIEW',
                'PREAPPROVED',
            ],
        }
        ad_set = AdSet(pk)
        ads = ad_set.get_ads(fields=fields, params=params)
        ads_list = list(ads)

        for ad in ads_list:
            new_dict = {}
            new_dict['ad_configured_status']=ad['configured_status']
            new_dict['ad_creative_id']=ad['creative']['id']
            new_dict['ad_effective_status']=ad['effective_status']
            new_dict['ad_id']=ad['id']
            new_dict['ad_name']=ad['name']
            response_data.append(new_dict)

        response_message = f"{len(ads_list)} Result/s Found For Adset Id : {pk}" if len(ads_list) > 0 \
            else f"No AdSet Found For Adset Id : {pk}"
        response_status = status.HTTP_200_OK

    except Exception as err:
        response_message , response_status = exception_handler(err)
    return json_responser(response_status, response_message, response_data)

@api_view(['GET'])
def list_constrains(request):
    """
    list static constrains
    """
    response_data = {}
    response_data.update({"objective_chioces":OBJECTIVE_CHOICES})
    response_data.update({"billing_events":BILLING_EVENT_CHOICES})
    response_data.update({"optimization_goals":OPTIMIZATION_GOAL_CHOICES})
    response_data.update({"currency_choices":CURRENCY_CHOICES})
    response_data.update({"status_choices":STATUS_CHOICES})
    response_message = "static choices"
    response_status = status.HTTP_200_OK
    return json_responser(response_status, response_message, response_data)

@api_view(['GET'])
def get_insights(request,pk):
    """
    This method use Adset insight API to display the click and impressions results
    """
    FacebookAdsApi.init(access_token=settings.MY_APP_TOKEN)
    response_data = []

    try:
        fields = [
            AdsInsights.Field.impressions,
            AdsInsights.Field.inline_link_clicks,
            AdsInsights.Field.spend,
        ]

        params = {
            'date_preset': 'maximum',
        }
        campaign = Campaign(pk)
        insights = campaign.get_insights(fields=fields, params=params)
        response_data = list(insights)
        response_message = "No insights Found" if len(response_data) == 0 else f"{len(response_data)} Result/s Found"
        response_status = status.HTTP_200_OK

    except Exception as err:
        response_message , response_status = exception_handler(err)

    return json_responser(response_status, response_message, response_data)

@api_view(['POST'])
def create_ad(request):
    """
    This method create new ad
    """
    FacebookAdsApi.init(access_token=settings.MY_APP_TOKEN)
    ser = adSerializers(data=request.data)
    response_data =[]
    if ser.is_valid():

        fields = [
        ]
        params = {
            'name': request.data['ad_creative_name'],
            'object_story_id': str(request.data['page_id']) +'_'+ str(request.data['post_id']) ,
            'image_url': request.data['image_url'],
            'link_url': request.data['ad_link'],
            'title': request.data['ad_creative_name'],
        }
        try:
            create_ad_creative = AdAccount(settings.ID).create_ad_creative(
                fields=fields,
                params=params,
            )
            fields = [
            ]
            params = {
                'name': request.data['ad_name'],
                'adset_id': request.data['adset_id'],
                'creative': create_ad_creative['id'],
                'status': request.data['status_type'],
            }
            ad_account = AdAccount(settings.ID).create_ad(
                fields=fields,
                params=params,
            )
            response_status = status.HTTP_201_CREATED
            response_message = f"Adset Successfully Created, Adset Id is {ad_account['id']}"
        except Exception as err:
            response_message , response_status = exception_handler(err)

    else:
        response_status = status.HTTP_400_BAD_REQUEST
        response_message = 'Please check your inputs, Not passed serializer!'
        response_data = json.dumps(ser.errors)

    return json_responser(response_status, response_message, response_data)

@api_view(['GET','POST'])
def ad_preview(request,pk):
    """
    This method use Ad Preview API to display Ads
    """
    FacebookAdsApi.init(access_token=settings.MY_APP_TOKEN)
    response_data = []

    try:
        fields = [
        ]
        params = {
            'ad_format': 'DESKTOP_FEED_STANDARD',
        }
        response_data = AdCreative(request.data['ad_creative_id']).get_previews(
            fields=fields,
            params=params,
        )[0]['body'].split('src="')[1].split('" width')[0].replace(';t=','&t=')

        response_message = "Ad Found"
        response_status = status.HTTP_200_OK

    except Exception as err:
        response_message, response_status = exception_handler(err)

    return json_responser(response_status, response_message, response_data)
