var ingame=!1,animated=!1,hist=!1,params={},steptogo=0,test=null,w=0,h=0,h2=0,w2=0,s=null,s3=null,lh=0,curr_date=new Date,total_scrolls=0,timeline=null,th=30,timeline_point=new Date(curr_date.getFullYear(),curr_date.getMonth(),1,0,0,0,0),timeline_end_point=new Date;timeline_end_point.setTime(timeline_point.getTime()),timeline_end_point.setYear(timeline_end_point.getFullYear()+65);var timeline_points=[timeline_point],timeline_scale=.5,timeline_period_w=0,timeline_month_w=0,scroll_per_month=3,reward_period=3,scrolls_for_reward=scroll_per_month*reward_period,life_scroll_count=0,def_age=21,min_age=18,max_age=60,male_max_age=65,female_max_age=60,onscrollbefore=null,onscrollup=null,onscrolldown=null,onscrollafter=null,fade_time=0,land=0,tick_count=4,is=!1,max_salary=99999,current_path_width=0,path=document.createElementNS("http://www.w3.org/2000/svg","path"),pathl=0,stage_offset=0,prev_stage_id=-1,stage_id=-1,interest=null,interest_level_map=[],category=null,prevPositionLeft=0,prevPosition=0,user={gender:"n",age:def_age,category:null,salary:100,interest:null,salary_percent:0,sended:!1},male=null,female=null,humans=null,interest_count=6,hash_map=[{name:"gender",alias:"g",nf:"poll.age"},{name:"age",alias:"a",nf:"poll.category"},{name:"category",alias:"c",nf:"poll.category"},{name:"salary",alias:"s",nf:"poll.interest"},{name:"interest",alias:"i",nf:"poll.interest"},{name:"salary_percent",alias:"p",nf:"play"}],noscrollEventTime=6e4,noscrollTimerId=null,_pos=-1,prev_pos=-1,pos_changed=!1;__defineGetter__("pos",function(){return _pos}),__defineSetter__("pos",function(t){prev_pos=_pos,_pos=t,params_time_set(),pos_changed=!0});for(var interest_offset=10,interest_animation_duration=100,interest_w=32,interest_w2=interest_w/2,interest_start_offset=0,states_mutation=[4,2,2,3,3,0],states_mutation_based=[1,0,0,0,0,0],i=0,sum=1;6>i;++i)states_mutation_based[i]=sum*states_mutation[i],sum*=states_mutation[i];var index=1,current_interests_count=0,mutation_empty=[{},{},{},{},{},{}],player=new playerObject,isSoundLoaded=!1;