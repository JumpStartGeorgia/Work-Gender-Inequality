class AdminController < ApplicationController
  before_filter :authenticate_user!
  before_filter do |controller_instance|
    controller_instance.send(:valid_role?, User::ROLES[:content_editor])
  end

  def index
    respond_to do |format|
      format.html # index.html.erb
    end
  end
  def gamedata
    respond_to do |format|
      format.csv { send_data GapPoll.to_csv, :type => 'text/csv', :filename => "GameData_#{DateTime.now.strftime('%Y-%m-%d_%H%M')}.csv" }
    end
  end
end
