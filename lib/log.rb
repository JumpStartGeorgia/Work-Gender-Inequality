module Log
  def self.write(*args)
    if Rails.env.development?
      Rails.logger.debug('------------------logger--------------------')
      args.each do |item|
        Rails.logger.debug(item)
      end
      Rails.logger.debug('-------------------end---------------------')
    end
  end
end	