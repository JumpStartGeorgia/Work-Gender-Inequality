class GapController < ApplicationController
  layout false
  def index  	
    respond_to do |format|
      format.html # index.html.erb
    end
  end
  def poll
    logger.debug(params);
    #render :json { :bid => "jiSDF322A(@@$Fda" }
  end
end
