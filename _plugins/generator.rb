# KUDOS: https://github.com/bighairydave/jekyll-datalist/blob/master/_plugins/generator.rb
module Jekyll

  class PhotoGenerator < Generator
    def generate(site)
      original_photos = []
      site.static_files.each_with_index do | file, index |
        if file.path.include? 'original/' and (file.path.include? 'jpg' or file.path.include? 'mp4')
          original_photos.push(file)
        end
      end
      original_photos.each_with_index do | file, index |
        photo_number = index + 1
        site.pages << PhotoPage.new(site, "/", "photos/#{ photo_number }", photo_number, original_photos.count)
      end
    end
  end

  class PhotoPage < Page
    def initialize(site, base, dir, photo_number, total_photos)
      @site = site
      @base = base
      @dir = dir
      @name = 'index.html'
      self.process('index.html')
      self.read_yaml(File.join(base, '_layouts'), 'photo.html')

      next_photo_number = photo_number + 1
      if next_photo_number > total_photos
        next_photo_number = 1
      end

      previous_photo_number = photo_number - 1
      if previous_photo_number <= 0
        previous_photo_number = total_photos
      end

      self.data['photo_number'] = photo_number
      self.data['next_photo_number'] = next_photo_number
      self.data['previous_photo_number'] = previous_photo_number
    end
  end

end
