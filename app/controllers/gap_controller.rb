class GapController < ApplicationController
  layout false 
  def index  	
    @about_short = Page.find_by_name('about_short')
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
    tick = 12
    min_age = 18
    gender = p['g']
    age = p['a'].to_i
    cat = p['c']
    salary = p['s'].to_i
    int_id = p['i']
    percent = p['p'].to_i
    cur_ticks = p['t'].to_i

    max_age = gender == 'm' ? 65 : 60
    total_years = max_age - min_age
    tick_limit = (total_years - (age-min_age)) * 12 / tick

    require 'game_data'
    d = {}
    category = GameData.category(cat)
    @interest = GameData.interest(int_id)

    msalary = 0
    if(gender=='m')
      msalary = salary
      fsalary = salary + (category[:outrun]==1 ? 1 : -1)*(salary * category[:percent] / 100);     
    else
      fsalary = salary
      msalary = salary + (category[:outrun]==1 ? -1 : 1)*(salary * category[:percent] / 100);     
    end

    msaving_for_tick = percent * msalary / 100;
    fsaving_for_tick = percent * fsalary / 100;

    d[:years_passed] = (cur_ticks * tick) / 12
    d[:months_passed] = ((cur_ticks * tick) % 12) * tick
    d[:title_job] = I18n.t("gap.gamedata.category.#{category[:id]}")
    d[:outrun] = category[:outrun] == 0 ? 'm' : 'f'
    d[:fclass] = 'female'
    d[:sclass] = 'male'

    if(gender == 'm')
      d[:fclass] = 'male'
      d[:sclass] = 'female'
    end
    percentTmp  = percent*1.0 / 100
    d[:fsalary_total] = (gender == 'm' ? msalary : fsalary) * (cur_ticks * tick)
    d[:fsaved_total] = (d[:fsalary_total] * percentTmp).floor;
    d[:ssalary_total] = (gender == 'm' ? fsalary : msalary) * (cur_ticks * tick)
    d[:ssaved_total] = (d[:ssalary_total] * percentTmp).floor;
    d[:salary_total_diff] = (d[:fsalary_total] - d[:ssalary_total]).abs.floor
    d[:saved_total_diff] = (d[:fsaved_total] - d[:ssaved_total]).abs.floor

    d[:fstate] = gender == 'm' && category[:outrun] == 0 ? true : false
    d[:sstate] = gender == 'm' && category[:outrun] == 0 ? false : true

    if(d[:fsaved_total] > d[:ssaved_total])
      
      ftmp = d[:ssaved_total]
      d[:saward] = []
      @interest[:items].reverse.each_with_index { |v,i|
        tmpInt = ftmp.divmod(v[:cost])
        if(tmpInt[0] >= 1) 
          d[:saward][i] = tmpInt[0]
          ftmp = tmpInt[1]
        else 
          d[:saward][i] = 0
        end
      }
      
      ftmp = d[:fsaved_total]
      d[:faward] = []
      @interest[:items].reverse.each_with_index { |v,i|
        tmpInt = ftmp.divmod(v[:cost])
        if tmpInt[0] > d[:saward][i] && i != 5
          tmpInt[0] = d[:saward][i] 
        end 
        if(tmpInt[0] >= 1)
          d[:faward][i] = tmpInt[0]
          ftmp = ftmp - tmpInt[0]*v[:cost]
        else 
          d[:faward][i] = 0
        end
      }
    else
      ftmp = d[:fsaved_total]
      d[:faward] = []
      @interest[:items].reverse.each_with_index { |v,i|
        tmpInt = ftmp.divmod(v[:cost])
        if(tmpInt[0] >= 1) 
          d[:faward][i] = tmpInt[0]
          ftmp = tmpInt[1]
        else 
          d[:faward][i] = 0
        end
      }

      ftmp = d[:ssaved_total]
      d[:saward] = []
      @interest[:items].reverse.each_with_index { |v,i|
        tmpInt = ftmp.divmod(v[:cost])
        if tmpInt[0] > d[:faward][i] && i != 5
          tmpInt[0] = d[:faward][i] 
        end 
        if(tmpInt[0] >= 1)
          d[:saward][i] = tmpInt[0]
          ftmp = ftmp - tmpInt[0]*v[:cost]          
        else 
          d[:saward][i] = 0
        end
      }

    end
    d[:daward] = []
    d[:saward].each_with_index { |v,i|
      d[:daward][i] = (d[:saward][i] - d[:faward][i]).abs
    }

    #Log.write(d[:daward],p,'asdfasdf',"#{1+5}")

    respond_to do |format|
      if p.present?
        encodedP = Base64.urlsafe_encode64(p.to_param)
        format.json { render :json => { :s => render_to_string('gap/_summary', :formats => [:html], :locals => { :p => p, :f => facebook, :d => d }) } }
        format.html { render 'gap/summary', :locals => { :p => p, :f => facebook, :d => d } }
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
    elsif params[:b].present? 
        p = fparse(params[:b])
        paramsOk = p.present?
    else 
      params.each do |k,v|
        p[k] =v if filter.include?(k)
      end
    end  
    if !p.has_key?('t') 
      p['t'] = 0
    end
    filter.each do |v| # check if parameter is missing
      if (!p.has_key?(v))  
        paramsOk = false 
        break
      end
    end
    logger.debug(paramsOk)
    p.each do |k,v| # remove extra parameters if exists
        p.delete(k) if !filter.include?(k)
    end
    return paramsOk ? p : nil
  end  

  def fparse(f)
    begin
      logger.debug(f)
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

