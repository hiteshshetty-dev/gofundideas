import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import { Card, Grid, Button } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';
class CampaignDetailView extends Component {
    static async getInitialProps(props) {
        const address = props.query.address;
        const campaign = Campaign(address);
        const summary = await campaign.methods.getSummary().call();

        return { minimumContribution: summary[0], balance: summary[1], requestsCount: summary[2], approversCount: summary[3], manager: summary[4], address: address };
    }
    renderCards() {
        const {
            balance,
            requestsCount,
            approversCount,
            minimumContribution,
            manager
        } = this.props

        const items = [
            {
                header: manager,
                meta: 'Address of Manager',
                description: 'The manager that created campaign for idea and request for money.',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: minimumContribution,
                meta: 'Minimum Contribution (wei)',
                description: 'You must contribute at least this much wei TO become contributer. '
            },
            {
                header: requestsCount,
                meta: 'Number of Requests',
                description: 'A request tries to withdraw  money from the contract.'
            },
            {
                header: approversCount,
                meta: 'Number of Approvers',
                description: 'Number of people who have already contributed to Campaign.'
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Balance Left (ether) ',
                description: 'Balance Left after approval of all requests',
            }

        ];
        return <Card.Group items={items} />
    }
    render() {
        return (
            <Layout>
                <h1>
                    View Campaign details
                </h1>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderCards()}

                        </Grid.Column>
                        <Grid.Column width={6}>
                            <ContributeForm address={this.props.address} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Link route={`/campaigns/${this.props.address}/requests`}>
                                <a>
                                    <Button primary>View Requests</Button>
                                </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>


            </Layout>
        );
    }
}

export default CampaignDetailView;