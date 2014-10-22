class ActionController::Request
  def remote_ip
    "109.238.228.42"
  end
end
class GapController < ApplicationController
  layout false
  def index  	
    respond_to do |format|
      format.html # index.html.erb
    end
  end
  def poll
    game_id = cookies['_game_id']
    flag = params[:flag].to_bool

    if game_id.blank? && !flag

      user_agent = UserAgent.parse(request.user_agent)
      resp = GapPoll.create(
        age:params[:age],
        gender:params[:gender],
        category:params[:category],
        salary:params[:salary],
        interest:params[:interest],
        saving_percent:params[:salary_percent],
        ip:request.remote_ip,
        country:request.location.country,
        city:request.location.city,
        lat:request.location.latitude,
        lon:request.location.longitude,
        platform:user_agent.platform,
        browser:user_agent.browser,
        mobile:user_agent.mobile?,
        agent:request.user_agent
      ) 
      cookies['_game_id'] = resp.id;

    elsif game_id.present? && flag
      resp = GapPoll.find(game_id)
      if !resp.finished
        resp.finished = true;
        resp.save
      end
    end

    respond_to do |format|
      format.json { render :json => {:finished => flag}}          
    end
  end
end
