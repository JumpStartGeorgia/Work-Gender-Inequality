class Admin::ImageUploaderController < ApplicationController
  before_filter :authenticate_user!
  before_filter do |controller_instance|
    controller_instance.send(:valid_role?, User::ROLES[:content_editor])
  end

  require 'fileutils'

  def create
    uploaded_io = params[:file]    
    if params[:file].present? && (params[:file].size/1024/1024) <= 5 
      file_name = transliterate_path(uploaded_io.original_filename)
      if ['.jpg','.png'].index(File.extname(file_name)).present?       

          path = "public/system/images/#{params['id']}"
          original_path = "#{path}/original"
          original_file = "#{original_path}/#{file_name}"
          medium_path = "#{path}/medium"
          url = "/system/images/#{params['id']}/medium/#{file_name}"

          # make sure the path to the file exists
          FileUtils.mkpath(original_path)
          FileUtils.mkpath(medium_path)

          # save the original file
          File.open(original_file, 'wb') do |file|
            file.write(uploaded_io.read)   
          end
          
          # create the versions
          if File.exists?(original_file)       
              Subexec.run "convert #{original_file} -resize '500x500>' #{Rails.root.join(medium_path,file_name)}"                
              render json: { image: { url: "#{url}" } }, content_type: "text/html"          
          else
              render json: {error: {message: I18n.t('imageuploader.missing') }}, content_type: "text/html"
          end         

        else
          render json: {error: {message: I18n.t('imageuploader.invalid_type') }}, content_type: "text/html"
        end
     else 
        render json: {error: {message: I18n.t('imageuploader.size_limit') }}, content_type: "text/html"
     end
  end 

private

  def transliterate(str)
    # Based on permalink_fu by Rick Olsen      
    # Escape str by transliterating to UTF-8 with Iconv http://stackoverflow.com/questions/12947910/force-strings-to-utf-8-from-any-encoding
    #s = Iconv.iconv('ascii//ignore//translit', 'utf-8', str).to_s
    s = str.force_encoding("UTF-8")  
    # Downcase string
    s.downcase!
   
    # Remove apostrophes so isn't changes to isnt
    s.gsub!(/'/, '')
   
    # Replace any non-letter or non-number character with a space
    s.gsub!(/[^[[:alnum:]]]+/, ' ')
   
    # Remove spaces from beginning and end of string
    s.strip!
   
    # Replace groups of spaces with single hyphen
    s.gsub!(/\ +/, '-')
   
    return s
  end

  def transliterate_path( filename )
    extension = File.extname(filename).gsub(/^\.+/, '')  
    name = filename.gsub(/\.#{extension}$/, '')

    "#{transliterate(name)}.#{transliterate(extension)}"
  end

end