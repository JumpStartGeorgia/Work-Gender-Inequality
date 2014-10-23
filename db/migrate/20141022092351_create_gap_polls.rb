class CreateGapPolls < ActiveRecord::Migration
  def change
    create_table :gap_polls do |t|
      t.string :gender , :limit => 1 # m(male) or f(female)
      t.integer :age, :limit => 3
      t.string :category, :limit => 8
      t.integer :salary
      t.string :interest, :limit => 8
      t.integer :saving_percent
      t.string :ip,:limit => 45
      t.string :country, :limit => 255
      t.string :city, :limit => 255
      t.decimal :lat, :precision => 15, :scale => 12
      t.decimal :lon, :precision => 15, :scale => 12
      t.string :platform, :limit => 255
      t.string :browser, :limit => 255
      t.boolean :mobile, :default => false
      t.string :agent, :limit => 255

      t.timestamps
    end
  end
end
