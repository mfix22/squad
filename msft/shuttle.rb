module MSFT
  class Pair
    def initialize(start, dest, time)
      @start = start
      @dest = dest
      @time = time
    end
    def self.unpack(data)
      split = data.split(" ")
      Pair.new(split[0], split[1], split[2])
    end
  end

  class TestCase
    def initialize(pairs)
      @pairs = pairs
    end

    def self.unpack(start, dest, data)
      debug "Unpacking #{start} to #{dest} from #{data.length} pairs"
      data.map{|pair| MSFT::Pair::unpack(pair)}
    end

    private
    def self.debug(msg)
      STDERR.puts("Debug: #{msg}")
    end
  end
  class TestCaseSet
    def self.unpack(data)
      data = data.split(/\r?\n|\r/)
      number_of_paths = data.shift
      debug "#{number_of_paths} paths to be calculated"

      set = []

      while data.length > 0
        start_dest = data.shift.split(" ")

        start = start_dest[0]
        dest = start_dest[1]

        num_pairs = data.shift.to_i

        case_data = []
        [0..num_pairs].each do
          case_data << data.shift
        end
        set << MSFT::TestCase::unpack(start, dest, case_data)
      end

      set
    end

    private
    def self.debug(msg)
      STDERR.puts("Debug: #{msg}")
    end
  end
end

testcase_set = MSFT::TestCaseSet::unpack(ARGF.read)
