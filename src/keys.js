import { decode } from 'bs58';

const keys = {
  olivia: '4hehGGzqTNrGBZi8MBAMsmKW7sA1Q3YwrhrbKyESqVH7ziJcP3nhnvEGaKiLC16WGLkxgXfiRAhnSQN5LTdqcbSs9M9kLvNyQ1tEXD7Ey8w1gr2N73z7rddec8qiZyMEoN',
  leofcoin: '4hehGGzqTNrGBZi8MBAMsmKW7sA1Q3YwrhrbKyESqVG8ECnaXPXtmm4gwadeXkkqJaqCJFXUVdytqFvm8A1Z8jaSCWWomXBVqF6PEM8KNAfxu63r49tvwCvHcNx1cfykMb'
}

export default network => decode(keys[network]).toString();
