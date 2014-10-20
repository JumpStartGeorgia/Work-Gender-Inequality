class GapController < ApplicationController
  def index
    respond_to do |format|
      format.html # index.html.erb
    end
  end

  def poll
    logger.debug(params);
    respond_to do |format|
      format.js { render :json { :id => "jiSDF322A(@@$Fda" }.to_json }
    end
  end
end
