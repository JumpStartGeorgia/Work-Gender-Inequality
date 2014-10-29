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
    logger.debug(params)
    if game_id.blank? && !flag

      user_agent = UserAgent.parse(request.user_agent)
      resp = GapPoll.create(
        age:params[:user][:age],
        gender:params[:user][:gender],
        category:params[:user][:category],
        salary:params[:user][:salary],
        interest:params[:user][:interest],
        saving_percent:params[:user][:salary_percent],
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
      cookies['_game_id'] = { value: resp.id, expires: 1.hour.from_now }

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
  def share
    #todo share staff
    logger.debug("-----------------------------------------------------")
    logger.debug(params)
    #"HTTP_USER_AGENT"=>"facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)"
    if request.user_agent.include?("facebook") && request.user_agent.include?("externalhit")
      logger.debug("Facebook------------------------------------------------",params)
      respond_to do |format|
        format.html # index.html.erb
      end
    else 
      logger.debug("Facebook------------------------------------------------",params)
      params.delete :fb_action_ids 
      params.delete :fb_action_types
      respond_to do |format|
        format.html index.html.erb params
      end
    end
  end
end

