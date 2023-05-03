import { useState } from 'react';
import {
    ConfigurationMenuProps, CONFIG_ROUTE, ConfigurationMenuOptionsType
} from './configuration.type';
import { Text, Button } from '@components/index';

export default function AddWallet({
    setTitle,
    handleNavigation,
}: ConfigurationMenuProps) {
    const options: ConfigurationMenuOptionsType[] = [
        {
            option: 'Quick Setup (recommended)',
            content: 'This option automatically detects the wallets installed and simplifies the process to configure them for trading. If using a custom data directory location, you must use Expert Setup.',
            route: CONFIG_ROUTE.ADD_WALLET_QUICK,
        },
        {
            option: 'Expert Setup (advanced users only)',
            content: 'This option allows you to specify the data directory locations and RPC credentials',
            route: CONFIG_ROUTE.ADD_WALLET_EXPERT
        }
    ]

    const [selectedOption, setSelectedOption] = useState(options[0]);

    return (
        <div className='d-flex flex-column flex-grow-1'>
            <div className='p-h-20'>
                <div className='m-v-5'>
                    <Text>Block DX is the fastees, most secure, most reliable, and most decentralized exchange, allowing for peer-to-eer trading directly from your wallet.{'\n'}</Text>
                </div>
                <div className='m-v-5'>
                    <Text className='text-bold'>Prerequisites: </Text><Text>Block DX requires the latest Blocnet wallet and the wallets of any assets you want to trade with. These must be downloaded and installed before continuing. See the full list of compatible assets and wallet versions.</Text>
                </div>
            </div>
            <div className='p-h-20 flex-grow-1 m-t-10'>
                {
                    options.map(({ option, content, route }, index) => (
                        <div className="form-check m-v-5" key={`configuration-menu-${index}`}>
                            <div>
                                <input
                                    className="form-check-input"
                                    type="radio" name="exampleRadios"
                                    id={`menu-${index}`}
                                    value={route}
                                    checked={selectedOption.route === route}
                                    onChange={(e) => {
                                        console.log('radio inside input: ', e.target.value)
                                        setSelectedOption(options[index]);
                                    }}
                                />
                                <Text className="configuration-setup-label" >
                                    {option}
                                </Text>
                            </div>
                            <Text>{content}</Text>
                        </div>
                    ))
                }
            </div>
            <div className='d-flex flex-row justify-content-between m-v-20'>
                <Button 
                    className='configuration-cancel-btn' 
                    onClick={() => {
                        setTitle(CONFIG_ROUTE.SET_UP);
                        handleNavigation(CONFIG_ROUTE.SET_UP)
                    }}
                >
                    CANCEL
                </Button>
                <Button 
                    className='configuration-continue-btn'
                    onClick={() => {
                        setTitle(selectedOption.route);
                        handleNavigation(selectedOption.route);
                    }}
                >
                    CONTINUE
                </Button>
            </div>
        </div>
    );
}
