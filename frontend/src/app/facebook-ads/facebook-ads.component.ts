import {Component, OnInit, ViewChild} from '@angular/core';
import {RestProvider} from '../provider/rest';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'facebook-ads',
  templateUrl: './facebook-ads.component.html',
  styleUrls: ['./facebook-ads.component.css']
})
export class FacebookAdsComponent implements OnInit {
  show_campaign_tab: boolean = false;
  show_adsets_tab: boolean = false;
  show_ads_tab: boolean = false;
  public loading: boolean = false;
  campaign_list: any = [];
  campaign_message : string = '';
  campaign_adsets_list: any =[];
  campaign_adset_message : string = '';
  adsets_ads_list: any =[];
  adsets_ads_message : string = '';
  campaign_insights_list: any =[];
  public objective_chioces: any =[];
  public billing_events_choices: any =[];
  public optimization_goals_choices: any =[];
  public currency_choices: any =[];
  public status_choices: any =[];
  campaign_insights_message : string = '';
  public campaign_name : any;
  public campaign_objective : any;
  public adset_name : any;
  public adset_campaign_id : any;
  public daily_budget : any;
  public publishing_days : any;
  public bid_amount : any;
  public currency : any;
  public billing_event : any;
  public optimization_goal : any;
  public age_max : any;
  public age_min : any;
  public ad_name :any;
  public ad_creative_name: any;
  public image_url: any;
  public ad_link: any;
  public page_id: any;
  public post_id: any;
  public ad_adset_id: any;
  public ad_status: any;
  public showAdsetComment : boolean = true;
  public showAdsComment : boolean = true;
  public show_iframe : boolean = true;
  public iframe_url : any = '';

  @ViewChild('notify') notify: any;
  @ViewChild('adNoti') adNoti: any;

  modal: any = {
    title: '',
    body: '',
    class: ''
  };
  constructor(private http: RestProvider, private modalService: NgbModal) {
    this.retrieveCompaigns()
    this.http.get('/list_constrains/', (response:any) => {

        if (response['response_code']== 200) {
          let staticDataList = response['response_data']
          this.objective_chioces  = staticDataList['objective_chioces']
          this.billing_events_choices  = staticDataList['billing_events']
          this.optimization_goals_choices  = staticDataList['optimization_goals']
          this.currency_choices  = staticDataList['currency_choices']
          this.status_choices  = staticDataList['status_choices']
        }

    });
  }

  ngOnInit(): void {
  }
  getCampaigns(){

    this.show_campaign_tab = true;
    this.show_adsets_tab = false;
    this.show_ads_tab = false;
  }
  getAdsets(){
    this.show_campaign_tab = false;
    this.show_adsets_tab = true;
    this.show_ads_tab = false;
  }
  getAds(){

    this.show_campaign_tab = false;
    this.show_adsets_tab = false;
    this.show_ads_tab = true;
    this.show_iframe = false;

  }

  retrieveCompaigns(){
    this.loading = true;
    this.http.get('/facebook_campaigns/', (response:any) => {

      if (response['response_code']== 200) {
        this.campaign_list = response['response_data']
        this.campaign_message = response['response_message']
        this.loading = false;

      } else {
        this.modal.body = response.response_message;
        this.modal.title = 'Error!';
        this.modal.class = 'btn btn-danger btn-lg';
        this.modalService.open(this.notify, {size: 'sm'}).result.then((result) => {
          this.modal = {
            body: response.response_message,
            title: 'Error',
            class: ''
          }
        });
        this.loading = false;
      }
    });
  }


  create_compaign(){
    this.loading = true;
    if(this.campaign_name && this.campaign_objective){
      this.http.post('/facebook_campaigns/', {
        name: this.campaign_name,
        objective: this.campaign_objective.toUpperCase(),
      }, (response:any) => {
        if (response['response_code'] == 201) {
          this.modal.body = response.response_message ;
          this.modal.title =  'Congratulations' ;
          this.modal.class = 'btn btn-success btn-lg';
          this.modalService.open(this.notify);
          this.retrieveCompaigns();
          this.loading = false;
        } else {
          this.modal.body = response.response_data;
          this.modal.title =  response.response_message ;
          this.modal.class = 'btn btn-danger btn-lg';
          this.modalService.open(this.notify, {size: 'lg'}).result.then((result) => {
            this.modal = {
              body: response.response_data,
              title: 'Error',
              class: ''
            }
          });
          this.loading = false;
        }

      })
    } else{
      this.modal.body = 'Fill required fields!';
      this.modal.title =  'Error' ;
      this.modal.class = 'btn btn-danger btn-lg';
      this.modalService.open(this.notify);
      this.loading = false;
    }
  }

  getCampaignInsights(selected_id:number){
    this.loading = true;
    this.show_campaign_tab = true;
    this.show_adsets_tab = false;
    this.show_ads_tab = false;
    let apply_url = '/get_insights/' + selected_id;
    this.http.get(apply_url, (response:any) => {

      if (response['response_code']== 200) {
        this.campaign_insights_list = response['response_data']
        this.campaign_insights_message = response['response_message']
        this.modal.body = response.response_message
        this.modal.title = 'Insights of campaign: ' + selected_id ;
        this.modal.class = 'btn btn-danger btn-lg';
        this.modalService.open(this.notify, {size: 'lg'}).result.then((result) => {
          this.modal = {
            body: response.response_message,
            title: 'Insights',
            class: ''
          }
        });
        this.loading = false;


      } else {
        this.modal.body = response.response_message;
        this.modal.title = 'Error!';
        this.modal.class = 'btn btn-danger btn-lg';
        this.modalService.open(this.notify, {size: 'sm'}).result.then((result) => {
          this.modal = {
            body: response.response_message,
            title: 'Error',
            class: ''
          }
        });
        this.loading = false;
      }
    });


  }



  getcampaignAdsets(selected_id:number){
    this.loading = true;
    this.show_campaign_tab = false;
    this.show_adsets_tab = true;
    this.show_ads_tab = false;
    let apply_url = '/get_campaign_adsets/' + selected_id;
    this.http.get(apply_url, (response:any) => {

      if (response['response_code']== 200) {
        this.campaign_adsets_list = response['response_data']
        this.campaign_adset_message = response['response_message']
        this.loading = false;
        this.showAdsetComment = false;
      } else {
        this.modal.body = response.response_message;
        this.modal.title = 'Error!';
        this.modal.class = 'btn btn-danger btn-lg';
        this.modalService.open(this.notify, {size: 'sm'}).result.then((result) => {
          this.modal = {
            body: response.response_message,
            title: 'Error',
            class: ''
          }
        });
        this.loading = false;
      }
    });

  }

  create_adsets(){
    this.loading = true;
    if(this.adset_name && this.adset_campaign_id && this.daily_budget && this.publishing_days
      && this.bid_amount && this.currency && this.billing_event && this.optimization_goal
      && this.age_max && this.age_min ){
      let data = {
        "name": this.adset_name,
        "campaign_id": this.adset_campaign_id,
        "daily_budget": this.daily_budget,
        "publishing_days": this.publishing_days,
        "bid_amount":this.bid_amount,
        "currency": this.currency,
        "billing_event": this.billing_event,
        "optimization_goal": this.optimization_goal,
        "age_max": this.age_max,
        "age_min": this.age_min
      }
      this.http.post('/create_adset/', data, (response:any) => {
        if (response['response_code'] == 201) {
          this.modal.body = response.response_message ;
          this.modal.title =  'Congratulations' ;
          this.modal.class = 'btn btn-success btn-lg';
          this.modalService.open(this.notify);
          this.getcampaignAdsets(this.adset_campaign_id);
          this.show_campaign_tab = false;
          this.show_adsets_tab = true;
          this.show_ads_tab = false;
          this.loading = false;
        } else {
          this.modal.body = response.response_data;
          this.modal.title =  response.response_message ;
          this.modal.class = 'btn btn-danger btn-lg';
          this.modalService.open(this.notify, {size: 'lg'}).result.then((result) => {
            this.modal = {
              body: response.response_data,
              title: 'Error',
              class: ''
            }
          });
          this.loading = false;
        }

      })
    } else{
      this.modal.body = 'Fill required fields!';
      this.modal.title =  'Error' ;
      this.modal.class = 'btn btn-danger btn-lg';
      this.modalService.open(this.notify);
      this.loading = false;
    }
  }

  getAdsofAdset(selected_id:number){
    this.show_iframe = false;
    this.loading = true;
    this.show_campaign_tab = false;
    this.show_adsets_tab = false;
    this.show_ads_tab = true;
    this.ad_adset_id = selected_id;
    let apply_url = '/get_adset_ads/' + selected_id;
    this.http.get(apply_url, (response:any) => {

      if (response['response_code']== 200) {
        this.adsets_ads_list = response['response_data']
        this.adsets_ads_message = response['response_message']
        this.loading = false;
        this.showAdsComment = false;
      } else {
        this.modal.body = response.response_message;
        this.modal.title = 'Error!';
        this.modal.class = 'btn btn-danger btn-lg';
        this.modalService.open(this.notify, {size: 'lg'}).result.then((result) => {
          this.modal = {
            body: response.response_message,
            title: 'Error',
            class: ''
          }
        });
        this.loading = false;
      }
    });

  }

  create_ad(){
    this.loading = true;
    if(this.ad_creative_name && this.image_url && this.ad_link && this.page_id &&
      this. post_id && this.ad_adset_id && this.ad_status){
      this.http.post('/create_ad/', {
        ad_name: this.ad_name,
        ad_creative_name: this.ad_creative_name,
        image_url: this.image_url,
        ad_link: this.ad_link,
        page_id: this.page_id,
        post_id: this.post_id,
        adset_id: this.ad_adset_id,
        status_type: this.ad_status
      }, (response:any) => {
        if (response['response_code'] == 201) {
          this.modal.body = response.response_message ;
          this.modal.title =  'Congratulations' ;
          this.modal.class = 'btn btn-success btn-lg';
          this.modalService.open(this.notify);
          this.getAdsofAdset(this.ad_adset_id);
          this.loading = false;
        } else {
          this.modal.body = response.response_data;
          this.modal.title =  response.response_message ;
          this.modal.class = 'btn btn-danger btn-lg';
          this.modalService.open(this.notify, {size: 'lg'}).result.then((result) => {
            this.modal = {
              body: response.response_data,
              title: 'Error',
              class: ''
            }
          });
          this.loading = false;
        }

      })
    } else{
      this.modal.body = 'Fill required fields!';
      this.modal.title =  'Error' ;
      this.modal.class = 'btn btn-danger btn-lg';
      this.modalService.open(this.notify);
      this.loading = false;
    }
  }

  adPreview(ad_id:number,ad_creative:number){
    this.loading = true;
    this.show_iframe = false;
    let apply_url = '/ad_preview/' + ad_id;
    this.http.post(apply_url,{
      ad_creative_id : ad_creative,

    }, (response:any) => {

      if (response['response_code']== 200) {

        this.show_iframe = true;

        this.iframe_url = response.response_data;

        this.loading = false;
      } else {
        this.modal.body = response.response_message;
        this.modal.title = 'Error!';
        this.modal.class = 'btn btn-danger btn-lg';
        this.modalService.open(this.notify, {size: 'lg'}).result.then((result) => {
          this.modal = {
            body: response.response_message,
            title: 'Error',
            class: ''
          }
        });
        this.loading = false;
      }
    });


  }

}
