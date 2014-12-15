module ApplicationHelper
  def title(page_title)
    content_for(:title) { page_title.html_safe }
  end

  def title_right(title)
    content_for(:title_right) { title.html_safe }
  end

  def description(description)
    content_for(:description) { description.html_safe }
  end

	def flash_translation(level)
    case level
    when :notice then "alert-info"
    when :success then "alert-success"
    when :error then "alert-danger"
    when :alert then "alert-danger"
    end
  end

	# from http://www.kensodev.com/2012/03/06/better-simple_format-for-rails-3-x-projects/
	# same as simple_format except it does not wrap all text in p tags
	def simple_format_no_tags(text, html_options = {}, options = {})
		text = '' if text.nil?
		text = smart_truncate(text, options[:truncate]) if options[:truncate].present?
		text = sanitize(text) unless options[:sanitize] == false
		text = text.to_str
		text.gsub!(/\r\n?/, "\n")                    # \r\n and \r -> \n
#		text.gsub!(/([^\n]\n)(?=[^\n])/, '\1<br />') # 1 newline   -> br
		text.html_safe
	end

  def current_url
    "#{request.protocol}#{request.host_with_port}#{request.fullpath}"
  end
  
	def full_url(path)
		"#{request.protocol}#{request.host_with_port}#{path}"
	end

	# put the default locale first and then sort the remaining locales
	def create_sorted_locales
    x = I18n.available_locales.dup
    
    # sort
    x.sort!{|x,y| x <=> y}

    # move default locale to first position
    default = x.index{|x| x == I18n.default_locale}
    if default.present? && default > 0
      x.unshift(x[default])
      x.delete_at(default+1)
    end

    return x
	end

	# put the default locale first and then sort the remaining locales
	def create_sorted_translation_objects(trans)
	  if trans.present?
      # sort
      trans.sort!{|x,y| x.locale <=> y.locale}

      # move default locale to first position
      default = trans.index{|x| x.locale == I18n.default_locale.to_s}
      if default.present? && default > 0
        trans.unshift(trans[default])
        trans.delete_at(default+1)
      end
	  end
    return trans
	end

end
