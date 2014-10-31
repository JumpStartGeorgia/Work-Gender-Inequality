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
    p = params_parse(params)

    if p.present?
      encodedP = Base64.urlsafe_encode64(p.to_param)
      if request.user_agent.include?("facebook") && request.user_agent.include?("externalhit") # if facebook robot
        @url = request.original_url.split('?').first + '?f=' + encodedP     
        @descr = "Gender " + I18n.t("gap.gamedata.gender.#{p['g']}") + ", Age " + p['a'] + ", Category " + I18n.t("gap.gamedata.category.#{p['c']}") + ", Salary " + p['s'] + ", Interest " +  I18n.t("gap.gamedata.interest.#{p['i']}") + ", Salary Percent " + p['p'] 
        respond_to do |format|
          format.html
        end
      else 
        redirect_to gap_summary_path(f:encodedP) and return    
      end
    end
  end


  def summary
    p = params_parse(params)
    facebook = params[:f].present? ? true : false
    respond_to do |format|
      if p.present?
        encodedP = Base64.urlsafe_encode64(p.to_param)
        format.json { render :json => { :s => render_to_string('gap/_summary', :formats => [:html], :locals => { :p=> p, :f => facebook }) } }
        format.html { render 'gap/summary', :locals => { :p => p, :f => facebook } }
      else
        format.json { render :json => { :s => "Summary can't be built" } }
      end
    end
  end

  private
  def params_parse(params)
    filter = ['g','a','c','s','i','p','t']
    p = {}
    paramsOk = true
    if params[:f].present?  # check if parameter f exists ? so facebook link decode and extract to p : ordinary url get only parameters as in filter array
        p = fparse(params[:f])
        paramsOk = p.present?
    else 
      params.each do |k,v|
        p[k] =v if filter.include?(k)
      end
    end  
    filter.each do |v| # check if parameter is missing
      if (!p.has_key?(v))  
        paramsOk = false 
        break
      end
    end

    p.each do |k,v| # remove extra parameters if exists
        p.delete(k) if !filter.include?(k)
    end
    return paramsOk ? p : nil
  end  

  def fparse(f)
    begin
      p = {}
      f = Base64.urlsafe_decode64(f)
      f.split('&').each{|s| 
        p[s.split('=').first] = s.split('=').second 
      }
      return p
    rescue => e
      return nil
    end
  end
end

