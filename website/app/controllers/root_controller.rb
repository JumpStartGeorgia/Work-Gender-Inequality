class RootController < ApplicationController

  def index
    @use_map = true
    
    @questions = SurveyQuestion.can_crosstab

    if request.post?
      # check to make sure row and col param is in list of questions
      if @questions.index{|x| x.code == params[:row]}.present? && @questions.index{|x| x.code == params[:col]}.present?
        @data = SurveyResult.crosstab_count(params[:row], params[:col])
        @result = SurveyResult.crosstab_count('h1', 'h8')
        if @result[:chart]
          gon.chart_data = @result[:chart][:data]
          gon.chart_labels = @result[:chart][:labels]
        end
        if @data[:map].present?
          gon.map_data = @data[:map]
          gon.map_filters = @data[:map_filters] # this is array of arrays: [[code, name], [code, name],...]
        end
      else
        #### DO SOMETHING?
      end
    end
    
    respond_to do |format|
      format.html # index.html.erb
    end
  end

end
