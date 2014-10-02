class RootController < ApplicationController

  def index

    respond_to do |format|
      format.html # index.html.erb
    end
  end

  def explore_data
    @use_map = true
    
    @questions = SurveyQuestion.can_crosstab

    # check to make sure row and col param is in list of questions
    row = @questions[0].code
    col = @questions[1].code
    if @questions.index{|x| x.code == params[:row]}.present? && @questions.index{|x| x.code == params[:col]}.present?
      row = params[:row]
      col = params[:col]
    end

    @data = SurveyResult.crosstab_count(row, col)
    if @data[:chart]
      gon.chart_data = @data[:chart][:data]
      gon.chart_labels = @data[:chart][:labels]
      gon.chart_title = "#{@data[:row_question].titlecase} <br /> by <br /> #{@data[:column_question].titlecase} <br /> <span class='total_responses'>(Total Responses: #{@data[:total_responses]})</span>"
      gon.chart_col_label = @data[:column_question].titlecase
      gon.chart_row_label = @data[:row_question].titlecase
    end
    if @data[:map_percents].present?
      gon.map_percents = @data[:map_percents]
      gon.map_counts = @data[:map_counts]
      gon.map_filters = @data[:map_filters] # this is array of arrays: [[code, name], [code, name],...]
    end
  end
  
  respond_to do |format|
    format.html # index.html.erb
  end

end
